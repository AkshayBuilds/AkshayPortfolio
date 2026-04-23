import Container from "../components/layout/Container.jsx";

export default function FooterSection() {
  return (
    <footer className="w-full bg-[#080808] py-12">
      <Container>
        <div className="border-t border-zinc-800 pt-8 text-center">
          <div className="mx-auto mb-6 h-px w-full bg-gradient-to-r from-transparent via-[#3b82f6]/25 to-transparent" />
          <p className="font-sans text-[13px] font-medium text-white/70">Designed &amp; Built by Akshay Chaudhary © 2026</p>
        </div>
      </Container>
    </footer>
  );
}
