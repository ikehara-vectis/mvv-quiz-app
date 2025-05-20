export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer footer-center p-4 bg-base-200 text-base-content">
      <aside>
        <p>© {year} vectis</p>
      </aside>
    </footer>
  );
}
