import React, { useState, useEffect, useCallback } from "react";
import { server } from "../../lib/api";

const LISTINGS = `
  query Listings {
    listings {
      id
      title
    }
  }
`;

const DELETE_LISTING = `
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

export function Listings() {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const { data } = await server.fetch({ query: LISTINGS });
    setItems(data.listings);
  };

  useEffect(() => {
    fetchItems();
  }, [setItems]);

  const handleDelete = (id) => async () => {
    await server.fetch({
      query: DELETE_LISTING,
      variables: { id },
    });
    fetchItems();
  };

  return (
    <div>
      <h2>Listings</h2>
      {items.length
        ? items.map((item) => (
            <div key={item.id}>
              <h3>{item.title}</h3>
              <button onClick={handleDelete(item.id)}>delete</button>
            </div>
          ))
        : "no listings"}
    </div>
  );
}
