import dynamic from "next/dynamic";
import Head from "next/head";
import styles from "../../styles/Editor.module.css";
const SideEditor = dynamic(() => import("../../components/SideEditor"), { ssr: false });

const DraftList = dynamic(() => import("../../components/DraftList"), {
    ssr: false,
});

export default function EditorPage() {
    return (
        <>
            <Head>
                <title>Lestari | Blog Dashboard</title>
                <meta name="description" content="Gunakan halaman ini untuk membuat atau mengedit blog Lestari" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <SideEditor />
                <div className={styles.draftContainer}>
                    <DraftList />
                </div>
                 <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2402370305885827"
     crossorigin="anonymous"></script>
<!-- Iki Iklan -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-2402370305885827"
     data-ad-slot="7875159975"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
            </main>
        </>
    );
}
