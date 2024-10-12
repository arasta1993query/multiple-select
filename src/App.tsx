import {useEffect, useState} from 'react';
import './App.css';
import Select from './components/molecules/select/Select.tsx';
import {IOption} from './interfaces/ISelect.ts';

function App() {
  const [selectItem, setSelectItem] = useState<IOption[]>(null);

  const setValue = (e: IOption[]) => {
    console.log('option', e);
    setSelectItem([...e]);
  };

  useEffect(() => {
    console.log('selectItem', selectItem);
  }, [selectItem]);

  const options = [
    {value: 'science', label: 'Science'},
    {value: 'education', label: 'Education'},
    {value: 'art', label: 'Art'},
    {value: 'sport', label: 'Sport'},
    {value: 'games', label: 'Games'},
    {value: 'health', label: 'Health'}
  ];

  return (
    <>
      <Select
        options={options}
        setValue={setValue}
        value={selectItem}
        multiple={true}
      />
    </>
  );
}

export default App;
