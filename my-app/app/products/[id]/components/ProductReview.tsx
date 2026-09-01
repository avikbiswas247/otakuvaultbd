"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star, Trash2, LogIn, X, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { isLoggedIn } from "@/lib/auth/client-auth";
import WriteReviewForm from "./WriteReviewForm";

/* ── Types ──────────────────────────────────────────────────── */

interface ReviewImage {
  id: number;
  image_url: string;
}

interface Review {
  id: number;
  user_id: number;
  username: string;
  rating: number;
  comment: string;
  created_at: string;
  images: ReviewImage[];
}

interface ReviewStats {
  average: number;
  count: number;
}

interface Props {
  productId: number;
  reviews: Review[];
  stats: ReviewStats;
}

/* ── Star row helper ────────────────────────────────────────── */

function Stars({
  rating,
  size = 16,
}: {
  rating: number;
  size?: number;
}) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={
            i <= rating
              ? "fill-amber-400 text-amber-400"
              : "text-gray-300 dark:text-gray-600"
          }
        />
      ))}
    </div>
  );
}

/* ── Lightbox ────────────────────────────────────────────────── */

function Lightbox({
  images,
  initialIndex,
  onClose,
}: {
  images: ReviewImage[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);

  const prev = useCallback(
    () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1)),
    [images.length]
  );
  const next = useCallback(
    () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1)),
    [images.length]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
      >
        <X size={24} />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      <div
        className="relative max-w-[90vw] max-h-[85vh] aspect-square"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[index].image_url}
          alt="Review photo"
          fill
          className="object-contain rounded-lg"
          sizes="90vw"
        />
      </div>
    </div>
  );
}

/* ── Rating distribution bar ────────────────────────────────── */

function RatingBar({
  value,
  count,
  total,
}: {
  value: number;
  count: number;
  total: number;
}) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-[#5F5F5F] dark:text-[#B0B0B0] w-3 text-right">
        {value}
      </span>
      <Star size={12} className="fill-amber-400 text-amber-400 shrink-0" />
      <div className="flex-1 h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <div
          className="h-full rounded-full bg-amber-400"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-[#9CA3AF] dark:text-[#6B7280] w-6 text-right">
        {count}
      </span>
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────── */

export default function ProductReview({
  productId,
  reviews,
  stats,
}: Props) {
  const router = useRouter();

  const [authed, setAuthed] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxImages, setLightboxImages] = useState<ReviewImage[]>([]);
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => {
    isLoggedIn().then(async (yes) => {
      setAuthed(yes);
      if (yes) {
        try {
          const res = await fetch("/api/auth/me", {
            credentials: "include",
          });
          if (res.ok) {
            const data = await res.json();
            setCurrentUserId(data.user?.userId ?? null);
          }
        } catch {
          /* ignore */
        }
      }
    });
  }, []);

  // Count per star for the distribution bar
  const starCounts = [5, 4, 3, 2, 1].map((val) => ({
    value: val,
    count: reviews.filter((r) => r.rating === val).length,
  }));

  async function handleDelete(reviewId: number) {
    if (!confirm("Delete this review?")) return;
    setDeleting(reviewId);
    try {
      const res = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Review deleted");
        router.refresh();
      } else {
        toast.error(data.message || "Failed to delete");
      }
    } catch {
      toast.error("Unable to connect to the server.");
    } finally {
      setDeleting(null);
    }
  }

  function openLightbox(images: ReviewImage[], index: number) {
    setLightboxImages(images);
    setLightboxIndex(index);
  }

  function formatDate(iso: string) {
    try {
      return new Date(iso).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return iso;
    }
  }

  /* ── Render ───────────────────────────────────────────────── */

  return (
    <section className="mt-20">
      {/* Section heading */}
      <h2 className="text-2xl sm:text-3xl font-bold text-[#171717] dark:text-white relative after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-violet-500 after:rounded-full pb-4 mb-10">
        Customer Reviews
      </h2>

      {/* Summary */}
      {stats.count > 0 && (
        <div className="flex flex-col sm:flex-row gap-8 mb-10">
          {/* Average */}
          <div className="text-center sm:text-left shrink-0">
            <p className="text-5xl font-bold text-[#171717] dark:text-white">
              {stats.average.toFixed(1)}
            </p>
            <div className="mt-2 flex justify-center sm:justify-start">
              <Stars rating={Math.round(stats.average)} size={20} />
            </div>
            <p className="mt-1 text-sm text-[#5F5F5F] dark:text-[#B0B0B0]">
              {stats.count} review{stats.count !== 1 && "s"}
            </p>
          </div>

          {/* Distribution */}
          <div className="flex-1 space-y-1.5 max-w-xs">
            {starCounts.map((s) => (
              <RatingBar
                key={s.value}
                value={s.value}
                count={s.count}
                total={reviews.length}
              />
            ))}
          </div>
        </div>
      )}

      {/* Reviews list */}
      {reviews.length === 0 ? (
        <p className="text-[#5F5F5F] dark:text-[#B0B0B0] mb-8">
          No reviews yet. Be the first to review this product!
        </p>
      ) : (
        <div className="space-y-6 mb-10">
          {reviews.map((r) => {
            const isOwn = currentUserId === r.user_id;
            const initial = r.username?.charAt(0)?.toUpperCase() ?? "?";

            return (
              <div
                key={r.id}
                className={`rounded-2xl border p-5 ${
                  isOwn
                    ? "border-violet-300 dark:border-violet-700 bg-violet-50/50 dark:bg-violet-950/20"
                    : "border-[#E6E3DE] dark:border-gray-700 bg-white dark:bg-[#18191D]"
                }`}
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-violet-600 dark:text-violet-400">
                        {initial}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#171717] dark:text-[#FAFAFA]">
                          {r.username}
                        </span>
                        {isOwn && (
                          <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400">
                            You
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Stars rating={r.rating} size={14} />
                        <span className="text-xs text-[#9CA3AF] dark:text-[#6B7280]">
                          {formatDate(r.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Delete button (own review) */}
                  {isOwn && (
                    <button
                      onClick={() => handleDelete(r.id)}
                      disabled={deleting === r.id}
                      className="p-2 rounded-lg text-red-500/70 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors disabled:opacity-50"
                      title="Delete review"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>

                {/* Comment */}
                {r.comment && (
                  <p className="mt-3 text-sm text-[#171717] dark:text-[#B0B0B0] leading-relaxed whitespace-pre-wrap">
                    {r.comment}
                  </p>
                )}

                {/* Images grid */}
                {r.images?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {r.images.map((img, imgIdx) => (
                      <button
                        key={img.id}
                        onClick={() => openLightbox(r.images, imgIdx)}
                        className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border border-[#E6E3DE] dark:border-gray-600 hover:ring-2 hover:ring-violet-400 transition-all"
                      >
                        <Image
                          src={img.image_url}
                          alt={`Review photo ${imgIdx + 1}`}
                          fill
                          className="object-cover"
                          sizes="112px"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Write review section */}
      {authed ? (
        <WriteReviewForm productId={productId} />
      ) : (
        <div className="rounded-2xl border border-dashed border-[#E6E3DE] dark:border-gray-600 p-8 text-center">
          <LogIn className="mx-auto h-8 w-8 text-[#9CA3AF] dark:text-[#6B7280] mb-3" />
          <p className="text-[#5F5F5F] dark:text-[#B0B0B0]">
            Log in to write a review
          </p>
          <Link
            href="/login"
            className="mt-3 inline-block text-sm font-semibold text-[#8B5CF6] hover:underline"
          >
            Sign In
          </Link>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={lightboxImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
}
