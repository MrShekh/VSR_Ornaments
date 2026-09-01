import Link from "next/link";

type EditorialLinkProps = {
  href: string;
  children: React.ReactNode;
  light?: boolean;
  className?: string;
};

export function EditorialLink({
  href,
  children,
  light = false,
  className = "",
}: EditorialLinkProps) {
  return (
    <Link
      href={href}
      className={`editorial-link ${light ? "editorial-link--light" : ""} ${className}`}
    >
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </Link>
  );
}
