import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../firebase";
import LinkItem from "./LinkItem";

function LinkList(props: any) {
  const { firebase } = useContext(FirebaseContext);
  const [links, setLinks] = useState([]);
  const isNewPage = props.location.pathname.includes("new");

  useEffect(() => {
    getLinks();
  }, []);

  function getLinks() {
    firebase.db
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

  function renderLinks() {
    if (isNewPage) {
      return links;
    }
    const topLinks = links
      .slice()
      .sort((l1, l2) => l2.votes.length - l1.votes.length);
    return topLinks;
  }

  return (
    <div>
      {renderLinks().map((link: any, index: number) => (
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
