import "./App.scss";

import { useDebouncedCallback } from "use-debounce";
import { useEffect, useState } from "react";
import ListItem from "./components/list-items/ListItem";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [items, setResults] = useState([]);

  const [isPending, setIsPending] = useState(false);
  const [locs, setLocs] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    //const value = getAll()

    upGetAll();
  }, []);

  function upGetAll() {
    getAll().then((items) => {
      // console.log("items",items.content)
      setLocs(items?.content.reverse() || []);
    });
  }
  const updateSearchTerm = (e) => {
    setIsPending(true);
    setSearchTerm(e.target.value);
    if (e.target.value.length) {
      searchLocations(e.target.value).then((items) => {
        // console.log("items", items)
        setIsPending(false);
        setResults(items?.items);
      });
    } else {
      setResults([]);
    }
    setIsPending(false);
  };

  const debounced = useDebouncedCallback(updateSearchTerm, 300);

  //  //API FUNCTION
  function searchLocations(search) {
    setIsFocused(true);
    const apiKey = "I163KtQ2i-pmAW66plzPwN7b_g6WLorlJj9v9zUVCqg";
    const limit = 5;
    return fetch(
      `https://geocode.search.hereapi.com/v1/geocode?apiKey=${apiKey}&q=${search}&limit=${limit}`,
      {
        method: "GET",
        redirect: "follow",
      }
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        return result;
      })
      .catch((error) => {
        console.log("error", error);
        return [];
      });
  }

  function save(loc) {
    console.log("loc", loc);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      locationInfo: loc,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8080/save", requestOptions);
  }
  function getAll() {
    return fetch(`http://localhost:8080/getAll`, {
      method: "GET",
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        //  console.log(result);
        return result;
      })
      .catch((error) => {
        console.log("error", error);
        return [];
      });
  }

  function store(y) {
    save(y);
    setResults([]);
    setTimeout(() => {
      upGetAll();
    }, 500);
  }
  return (
    <div className="App">
      <div className="">
        <input
          className="example-form"
          placeholder="Search"
          onChange={debounced}
          // onFocus={() => setIsFocused(true)}
          // onBlur={() => setIsFocused(false)}
        />
        {isPending && <div>Searching ...</div>}
        {
          <div className="itemList">
            {items.map((item) => (
              <div className="input-field-item" key={item.id}>
                <p onClick={() => store(item.title)} className="searchlist">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        }
      </div>
      <ListItem locsinfo={locs}></ListItem>
    </div>
  );
};
export default App;
