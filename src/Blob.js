import "./styles.css";
import { motion } from "framer-motion";

export default function Blob({ className, imgUrl }) {
  return (
    <>
      <motion.div
        whileHover={{ scale: 1.2 }}
        drag={true}
        dragConstraints={{ left: 0, right: 250, top: 0, bottom: 50 }}
        className="blob_img"
      >
        <img className={className} src={imgUrl} alt="blob" />
      </motion.div>
    </>
  );
}
