import { useState, useEffect, useContext } from "react";
import APIContext from "../API/APIContext";
import Loading from "../modal/Loading";

const DogFacts = () => {
  const { data, isLoading } = useContext(APIContext);

  const [facts, setFacts] = useState([]);
  const [selectedFacts, setSelectedFacts] = useState([]);
  const [input, setInput] = useState('');
  const [isAddingFact, setIsAddingFact] = useState(false);

  //fetched data from the API passed to local state
  useEffect(() => {
    if (data && data.facts) {
      setFacts(data.facts);
    }
  }, [data]);


  const handleChange = (index) => {
    const newSelectedFacts = [...selectedFacts];
    const fact = facts[index];

    if (selectedFacts.includes(fact)) {
      setSelectedFacts(newSelectedFacts.filter((selectedFact) => selectedFact !== fact));
    } else {
      setSelectedFacts([...newSelectedFacts, fact]);
    }
  };

  //remove facts 
  const handleRemove = () => {
    setFacts(facts.filter((fact) => !selectedFacts.includes(fact)));
    setSelectedFacts([]);
  };

  //add facts
  const handleAdd = () => {
    if (!input) return;
    setIsAddingFact(true); 
    setTimeout(() => { // simulate an API call delay
      setFacts([...facts, input]);
      setInput('');
      setIsAddingFact(false);
    }, 1000);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container mx-auto py-10 mt-14 w-1/2 bg-gradient-to-r from-cyan-500 to-blue-500">
          <h1 className="text-2xl text-center mb-2">Facts about Dogs!</h1>
          <div className="w-4/5 mx-auto grid grid-cols-1 gap-y-6 bg-white rounded-lg p-2 shadow-2xl">
            {facts.map((fact, index) => (
              <div key={index} className="flex justify-between">
                <p>{fact}</p>
                <input
                  type="checkbox"
                  name="select-dog"
                  onChange={() => handleChange(index)}
                  checked={selectedFacts.includes(fact)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="container mx-auto w-1/2 mt-7 grid grid-cols-1 gap-y-4 ">
        <div className="relative">
          <input 
          type="text" 
          placeholder="Add more dog facts" 
          className="h-20 w-full border-2 border-slate-300 "
          value={input}
          onChange={e=> setInput(e.target.value)}
          />
          {isAddingFact ? (
            <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] absolute bottom-0 right-0 mr-2 mb-2"
          role="status">
          </div>
          ): ('')}
          
        </div>
        
        <button onClick={handleAdd}
          className="bg-blue-500 rounded-lg w-full p-2">
          Add more Dog Facts
        </button>
        <button onClick={handleRemove} className="bg-red-400 p-2 rounded-lg w-full">
          Remove {selectedFacts.length} selected Facts
        </button>
      </div>
    </>
  );
};

export default DogFacts;
