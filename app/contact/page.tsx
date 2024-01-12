import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Link from "next/link";
import buttonStyles from "../../styles/Buttons.module.scss";


export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white">
        <h2 className="text-2xl font-semibold mb-8">
          You have a question about our service or just want to let us know you
          love chicharron?
        </h2>
        <Contact />
        <div className="mt-16">
          <Link href="/" passHref>
            <button className={buttonStyles.customButton}>Back</button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
