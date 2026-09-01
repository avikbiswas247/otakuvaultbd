"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Star, Loader2, ImagePlus, X } from "lucide-react";
import { toast } from "sonner";

const MAX_IMAGES = 4;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export default function WriteReviewForm({
  productId,
}: {
  productId: number;
}) {
  const router = useRouter();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFilesSelected(selected: FileList | null) {
    if (!selected) return;

    const incoming = Array.from(selected);
    const remaining = MAX_IMAGES - files.length;

    if (incoming.length > remaining) {
      toast.error(`Maximum ${MAX_IMAGES} images allowed`);
      incoming.length = remaining;
    }

    const valid: File[] = [];
    const validPreviews: string[] = [];

    for (const file of incoming) {
      if (!file.type.startsWith("image/")) {
        toast.error("Only image files are allowed");
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast.error("Each image must be under 5 MB");
        continue;
      }
      valid.push(file);
      validPreviews.push(URL.createObjectURL(file));
    }

    setFiles((prev) => [...prev, ...valid]);
    setPreviews((prev) => [...prev, ...validPreviews]);
  }

  function removeImage(index: number) {
    URL.revokeObjectURL(previews[index]);
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (rating < 1) {
      toast.error("Please select a star rating");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a review comment");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("productId", String(productId));
      formData.append("rating", String(rating));
      formData.append("comment", comment.trim());
      for (const file of files) {
        formData.append("images", file);
      }

      const res = await fetch("/api/reviews", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to submit review");
        return;
      }

      toast.success(data.message || "Review submitted!");

      // Reset form
      setRating(0);
      setComment("");
      for (const url of previews) URL.revokeObjectURL(url);
      setFiles([]);
      setPreviews([]);

      // Refresh server-rendered reviews + stats
      router.refresh();
    } catch {
      toast.error("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 rounded-2xl border border-[#E6E3DE] dark:border-gray-700 bg-white dark:bg-[#18191D] p-5 sm:p-6"
    >
      <h3 className="text-lg font-semibold text-[#171717] dark:text-[#FAFAFA] mb-4">
        Write a Review
      </h3>

      {/* Rating stars */}
      <div className="flex items-center gap-1 mb-4">
        <p className="text-sm text-[#5F5F5F] dark:text-[#B0B0B0] mr-2">
          Your rating:
        </p>
        {[1, 2, 3, 4, 5].map((star) => {
          const active = star <= (hoverRating || rating);
          return (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
              className="transition-transform hover:scale-110"
            >
              <Star
                size={24}
                className={`${
                  active
                    ? "fill-amber-400 text-amber-400"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Comment */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience with this product..."
        rows={4}
        className="w-full rounded-xl border border-[#E6E3DE] dark:border-gray-600 bg-white dark:bg-black px-4 py-3 text-[#171717] dark:text-[#FAFAFA] placeholder:text-[#9CA3AF] dark:placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-shadow resize-none"
      />

      {/* Image upload */}
      <div className="mt-4">
        <div className="flex flex-wrap gap-3">
          {previews.map((src, index) => (
            <div
              key={src}
              className="relative w-20 h-20 rounded-lg overflow-hidden border border-[#E6E3DE] dark:border-gray-600"
            >
              <Image
                src={src}
                alt={`Review image ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-1.5 -right-1.5 p-1 rounded-full bg-red-500 text-white shadow hover:bg-red-600 transition-colors"
              >
                <X size={12} />
              </button>
            </div>
          ))}

          {files.length < MAX_IMAGES && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-20 h-20 rounded-lg border-2 border-dashed border-[#E6E3DE] dark:border-gray-600 flex flex-col items-center justify-center gap-1 text-[#9CA3AF] dark:text-[#6B7280] hover:border-[#8B5CF6] hover:text-[#8B5CF6] transition-colors"
            >
              <ImagePlus size={20} />
              <span className="text-[10px] font-medium">
                {files.length}/{MAX_IMAGES}
              </span>
            </button>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => {
            handleFilesSelected(e.target.files);
            e.target.value = "";
          }}
        />

        <p className="mt-2 text-xs text-[#9CA3AF] dark:text-[#6B7280]">
          Attach up to {MAX_IMAGES} product photos (jpg, png, webp · max 5 MB
          each)
        </p>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="mt-5 inline-flex items-center gap-2 px-6 py-3 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold rounded-xl shadow-lg shadow-violet-200/30 dark:shadow-violet-900/20 hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            Submitting...
          </>
        ) : (
          "Submit Review"
        )}
      </button>
    </form>
  );
}
