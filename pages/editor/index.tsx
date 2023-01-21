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
            </main>
        </>
    );
}
