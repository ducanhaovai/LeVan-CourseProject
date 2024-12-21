import { useEffect } from "react";

const usePrevent = () => {
  // useEffect(() => {
  //   const blurScreen = () => {
  //     const blurOverlay = document.createElement("div");
  //     blurOverlay.id = "blur-overlay";
  //     blurOverlay.style.position = "fixed";
  //     blurOverlay.style.top = "0";
  //     blurOverlay.style.left = "0";
  //     blurOverlay.style.width = "100%";
  //     blurOverlay.style.height = "100%";
  //     blurOverlay.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
  //     blurOverlay.style.zIndex = "9999";
  //     blurOverlay.style.backdropFilter = "blur(10px)";
  //     document.body.appendChild(blurOverlay);
  //   };
  //   const removeBlur = () => {
  //     const blurOverlay = document.getElementById("blur-overlay");
  //     if (blurOverlay) {
  //       document.body.removeChild(blurOverlay);
  //     }
  //   };
  //   const handleContextMenu = (e) => {
  //     e.preventDefault();
  //   };
  //   const handleKeyDown = (e) => {
  //     const ctrlShiftKey = (keyCode) =>
  //       e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
  //     if (
  //       e.keyCode === 123 ||
  //       ctrlShiftKey("I") ||
  //       ctrlShiftKey("J") ||
  //       ctrlShiftKey("C") ||
  //       (e.ctrlKey && e.keyCode === "U".charCodeAt(0))
  //     ) {
  //       e.preventDefault();
  //       blurScreen();
  //       return false;
  //     }
  //     if (e.keyCode === 44) {
  //       e.preventDefault();
  //       blurScreen();
  //       return false;
  //     }
  //     if (e.metaKey) {
  //       e.preventDefault();
  //       blurScreen();
  //       return false;
  //     }
  //   };
  //   const handleKeyUp = (e) => {
  //     if (e.key === "S" && e.shiftKey && e.metaKey) {
  //       e.preventDefault();
  //       blurScreen();
  //       return false;
  //     }
  //   };
  //   document.addEventListener("contextmenu", handleContextMenu);
  //   document.addEventListener("keydown", handleKeyDown);
  //   document.addEventListener("keyup", handleKeyUp);
  //   return () => {
  //     removeBlur();
  //     document.removeEventListener("contextmenu", handleContextMenu);
  //     document.removeEventListener("keydown", handleKeyDown);
  //     document.removeEventListener("keyup", handleKeyUp);
  //   };
  // }, []);
};

export default usePrevent;
