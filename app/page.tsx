import Footer from "@/components/footer";
import Link from "next/link";
import PiggyBank from "../components/PiggyBank";
import buttonStyles from "../styles/Buttons.module.scss";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white">
        <h2 className="text-2xl font-semibold mb-8">
          {"ETH SEPOLIA PIGGY BANK"}
        </h2>
        <PiggyBank />
        <div className="mt-16">
          <Link href="/contact" passHref>
            <button className={buttonStyles.customButton}>Contact us</button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

