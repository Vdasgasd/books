"use client";
// module.exports = (req, res) => {
//   try {
//

//     // Simulate successful logout
//     res.redirect("/");
//   } catch (error) {
//     // Handle any potential errors
//     console.error("Error during logout:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// pages/some-page.js
import { useEffect } from "react";

const SomePage = () => {
  useEffect(() => {
    // Redirect to the desired directory
    window.location.href = "/";
  }, []);

  // Return an empty component since we're redirecting
  return null;
};

// export async function getServerSideProps() {
//   // This function is required even though it's empty
//   return { props: {} };
// }

export default SomePage;
