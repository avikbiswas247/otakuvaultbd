"use client";

interface Props {
  search: string;
  setSearch: (v: string) => void;

  series: string;
  setSeries: (v: string) => void;

  type: string;
  setType: (v: string) => void;

  size: string;
  setSize: (v: string) => void;

  price: number;
  setPrice: (v: number) => void;

  seriesList: string[];
  typeList: string[];
  sizeList: string[];
}

export default function FilterSidebar({
  search,
  setSearch,

  series,
  setSeries,

  type,
  setType,

  size,
  setSize,

  price,
  setPrice,

  seriesList,
  typeList,
  sizeList,
}: Props) {
  return (
    <div className="border rounded-xl p-5  bg-white dark:bg-black relative  shadow h-fit fixed top-[30vh]">

      <h2 className="text-2xl font-bold mb-5">
        Filters
      </h2>

      {/* Search */}

      <div className="mb-6">

        <label className="font-semibold">
          Search
        </label>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-2 w-full border rounded-lg p-2"
        />

      </div>

      {/* Series */}

      <div className="mb-6">

        <label className="font-semibold">
          Series
        </label>

        <select
          value={series}
          onChange={(e) => setSeries(e.target.value)}
          className="mt-2 w-full border rounded-lg p-2 dark:bg-black"
        >
          {seriesList.map(item => (
            <option key={item} className="dark:bg-black">
              {item}
            </option>
          ))}
        </select>

      </div>

      {/* Type */}

      <div className="mb-6">

        <label className="font-semibold">
          Type
        </label>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mt-2 w-full border rounded-lg p-2 dark:bg-black"
        >
          {typeList.map(item => (
            <option key={item} className="dark:bg-black">
              {item}
            </option>
          ))}
        </select>

      </div>

      {/* Size */}

      <div className="mb-6">

        <label className="font-semibold">
          Size
        </label>

        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="mt-2 w-full border rounded-lg p-2 dark:bg-black "
        >
          {sizeList.map(item => (
            <option key={item}>
              {item}
            </option>
          ))}
        </select>

      </div>

      {/* Price */}

      <div>

        <label className="font-semibold">
          Maximum Price
        </label>

        <input
          type="range"
          min={0}
          max={100000}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full mt-3"
        />

        <div className="font-bold mt-2">
          ${price}
        </div>

      </div>

    </div>
  );
}
