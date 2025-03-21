import {React,useState,useEffect} from "react";


const options = ['pepperoni', 'chicken', 'bacon'];

const HomeTest = () => {
  const [selected, setSelected] = useState(null);

  const onChange = (i) => {
    setSelected((prev) => (i === prev ? null : i));
    console.log(selected)
  }

  useEffect(() => {
    console.log(selected);
  }, [selected])

  return (
    <div className="flex justify-center">
      {options.map((o, i) => (
        <label key={i}>
          {o}
          <input
            type="radio"
            checked={i === selected}
            onChange={() => onChange(i)}
            name=""
          />
        </label>
      ))}
      <br />
    </div>
  )
};

export default HomeTest;
