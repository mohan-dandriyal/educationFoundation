import Link from "next/link";

export type BreadcrumbItem = {
    label: string;
    href?: string;
};

type BreadcrumbProps = {
    items: BreadcrumbItem[];
    tone?: "dark" | "light";
    className?: string;
};



function Separator() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="h-3 w-3 shrink-0 text-[#b49358]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M6 3l5 5-5 5" />
        </svg>
    );
}

export function Breadcrumb({
    items,
}: BreadcrumbProps) {

    return (
        <nav
            aria-label="Breadcrumb"
            className={`font-[Arial,Helvetica,sans-serif] text-sm`}
        >
            <ol className={`m-0 flex list-none flex-wrap items-center gap-x-2 gap-y-1 p-0`}>
                {items.map((item, i) => {
                    const isLast = i === items.length - 1;

                    return (
                        <li key={`${item.label}-${i}`} className="flex min-w-0 items-center gap-2">
                            {isLast || !item.href ? (
                                <span
                                    aria-current={isLast ? "page" : undefined}
                                    className={`truncate font-medium  max-w-[14rem] sm:max-w-none`}
                                >
                                    {item.label}
                                </span>
                            ) : (
                                <Link
                                    href={item.href}
                                    className={`rounded-sm underline-offset-4 opacity-80 transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b49358]`}
                                >
                                    {item.label}
                                </Link>
                            )}
                            {!isLast && <Separator />}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}