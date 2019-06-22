import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../firebase";
import LinkItem from "./LinkItem";

function LinkList(props: any) {
  const { firebase } = useContext(FirebaseContext);
  const [links, setLinks] = useState([]);
  const isTopPage = props.location.pathname.includes("top");

  useEffect(() => {
    const unsubscribe = getLinks();
    return () => unsubscribe();
  }, [isTopPage]);

  function getLinks() {
    if (isTopPage) {
      return firebase.db
        .collection("links")
        .orderBy("voteCount", "desc")
        .onSnapshot(handleSnapshot);
    }
    return firebase.db
      .collection("links")
      .orderBy("created", "desc")
      .onSnapshot(handleSnapshot);
  }

  function handleSnapshot(snapshot) {
    const links = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });
    setLinks(links);
  }

  return (
    <div>
      {links.map((link: any, index: number) => (
        <LinkItem
          key={link.id}
          showCount={true}
          link={link}
          index={index + 1}
        />
      ))}
    </div>
  );
}

export default LinkList;
