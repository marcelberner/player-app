import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import styles from "./NavLabel.module.scss";

interface labelProps {
  children?: JSX.Element;
}

const NavLabel: React.FC<labelProps> = ({ children }) => {
  const router = useRouter();

  let path = "";

  return (
    <nav className={styles.nav_label}>
      {children}
      {router.pathname.split("/").map((route, index) => {
        let query;

        if (route.length > 0) {
          if (route[0] == "[" && route[route.length - 1] == "]") {
            const routeKey = route.slice(1, route.length - 1);
            query = router.query[`${routeKey}`];
          } else
            path = path += `${index !== 0 ? "/" : ""}${query ? query : route}`;

          return (
            <React.Fragment key={index}>
              {index > 1 && <span>&gt;</span>}
              <Link href={path} className={styles.route}>
                {query ? query : route}
              </Link>
            </React.Fragment>
          );
        }
      })}
    </nav>
  );
};

export default NavLabel;
