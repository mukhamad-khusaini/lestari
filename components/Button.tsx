import type { Button } from "../Interface";
import styles from "../styles/Button.module.css";

export default function Button({ children, variant = "contained", color = "default", onClick }: Button) {
    if (variant === "contained") {
        if (color === "default") {
            return (
                <button type="button" onClick={onClick} className={styles.buttonContained}>
                    {children}
                </button>
            );
        }
        return (
            <button type="button" onClick={onClick} className={styles.buttonContainedWhite}>
                {children}
            </button>
        );
    }

    if (color === "white") {
        return (
            <button type="button" onClick={onClick} className={styles.buttonOutlinedWhite}>
                {children}
            </button>
        );
    }
    return (
        <button type="button" onClick={onClick} className={styles.buttonOutlined}>
            {children}
        </button>
    );
}
