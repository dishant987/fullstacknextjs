import { Skeleton } from "@/components/ui/skeleton";

const Page = () => {
  return (
    <Skeleton className="w-full sm:w-[400px] md:w-[400px] lg:min-w-[450px] dark:bg-black">
      <div className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4 mx-auto mt-3 bg-gray-300 dark:bg-gray-700" />
          <div className="mt-2 max-w-sm text-center py-3">
            {/* Skeleton for the main text */}
            <Skeleton className="h-6 w-full mb-2" />

            {/* Skeleton for the line break */}
            <div className="h-6 w-full mb-2">
              <Skeleton className="h-6 w-full" />
            </div>

            {/* Skeleton for the registration link */}
            <Skeleton className="h-6 w-3/4 mx-auto" />
          </div>
          <div className="flex w-full flex-col space-y-2 mb-4">
            <Skeleton className="h-5 w-1/4" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex w-full flex-col space-y-2 mb-4">
            <Skeleton className="h-5 w-1/4" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="flex items-center my-4 space-x-2">
            <Skeleton className="h-6 w-12 rounded-md" />{" "}
            {/* Adjust size to match the Switch */}
            <Skeleton className="h-6 w-24 rounded-md" />{" "}
            {/* Adjust size to match the label */}
          </div>

          <div className="relative">
            <Skeleton className="h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900" />
          </div>
          <div className="flex flex-col space-y-4">
            <div className="relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4">
              <Skeleton className="h-4 w-4 bg-gray-300 dark:bg-zinc-700" />
              <Skeleton className="h-4 w-24 bg-gray-300 dark:bg-zinc-700" />
            </div>
            <div className="relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4">
              <Skeleton className="h-4 w-4 bg-gray-300 dark:bg-zinc-700" />
              <Skeleton className="h-4 w-24 bg-gray-300 dark:bg-zinc-700" />
            </div>
          </div>
        </div>
      </div>
    </Skeleton>
  );
};

export default Page;
