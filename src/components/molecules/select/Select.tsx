import {useState} from 'react';
import './select.scss';
import {IOption, IProps} from '../../../interfaces/ISelect.ts';
import Arrow from '../../../assets/svg/chevron-down-solid.svg?react';

const Select = ({
  options,
  setValue,
  className = '',
  placeholder = 'Select an option',
  multiple = false,
  value = []
}: IProps) => {
  const [close, setClose] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [tempSelect, setTempSelect] = useState<IOption>(options[0]);
  const [innertOptions, setInnerOptions] = useState<IOption[]>(options);
  const selected: IOption[] = multiple
    ? Array.isArray(value)
      ? value
      : []
    : value
      ? [value as IOption]
      : [];

  const selectOption = (e, option: IOption) => {
    e.stopPropagation();
    if (multiple) {
      const tempIndex = selected.findIndex(x => x.value === option.value);
      if (tempIndex > -1) {
        selected.splice(tempIndex, 1);
      } else {
        selected.push(option);
      }
      setValue([...selected]);
      return;
    }
    selected.pop();
    selected.push(option);
    setValue(selected[0]);
    setClose(true);
  };

  const selectTempOptions = (e, option) => {
    setInnerOptions(prevState => {
      const temp = [...prevState];
      temp.unshift({...option});
      return temp;
    });
    setSearch('');
    selectOption(e, option);
  };

  const searchFor = e => {
    const val = e.target.value;
    setSearch(val);
    setTempSelect({
      value: val,
      label: val
    });
  };

  const handleKeyPress = e => {
    if (e.key === 'ArrowDown') {
      setTempSelect(prevState => {
        const index = innertOptions.findIndex(x => x.value === prevState.value);
        if (index > -1 && index < innertOptions.length - 1) {
          return {...innertOptions[index + 1]};
        }
        if (index === innertOptions.length - 1) {
          return {...innertOptions[0]};
        }
        return {...innertOptions[0]};
      });
    }
    if (e.key === 'ArrowUp') {
      setTempSelect(prevState => {
        const index = innertOptions.findIndex(x => x.value === prevState.value);
        if (index > 0) {
          return {...innertOptions[index - 1]};
        }
        if (index === 0) {
          return {...innertOptions[innertOptions.length - 1]};
        }
        return {...innertOptions[0]};
      });
    }

    if (e.key === 'Enter') {
      selectOption(e, {...tempSelect});
    }
  };

  return (
    <div className={`select-container ${className}`}>
      <div
        className={`select-input ${close ? 'close' : 'open'}`}
        onClick={() => setClose(!close)}
      >
        {selected ? (
          multiple ? (
            <div className='selected-input-items-container'>
              {Array.isArray(value) &&
                selected.map(select => (
                  <p
                    className='text-xs main-text selected-input-items'
                    key={select.value}
                    onClick={e => selectOption(e, select)}
                  >
                    {select.label}
                  </p>
                ))}
              <input
                type='text'
                className='temp-input'
                value={search}
                onInput={searchFor}
                onClick={e => (!close ? e.stopPropagation() : '')}
                onKeyDown={handleKeyPress}
              />
            </div>
          ) : (
            <p className='text-xs main-text'>{selected[0]?.label}</p>
          )
        ) : (
          <p className='text-xs placeholder-text'>{placeholder}</p>
        )}
        <div className={`${close ? 'close' : 'open'} arrow`}>
          <Arrow />
        </div>
      </div>
      <div className={`options-container ${close ? 'close' : 'open '}`}>
        <div className='options-box rounded-xl border border-woodsmook-border'>
          {search &&
          innertOptions.findIndex(x => x.value === search.toLowerCase()) ===
            -1 ? (
            <div
              className={`option text-xs main-text ${tempSelect?.value === search ? 'temp-select' : ''}`}
              onClick={e =>
                selectTempOptions(e, {value: search, label: search})
              }
            >
              <div>{search}</div>
            </div>
          ) : null}
          {innertOptions.map(option => (
            <div
              className={`option text-xs main-text ${multiple ? (selected.findIndex(s => s.value === option.value) > -1 ? 'selected' : '') : ''} ${tempSelect?.value === option.value ? 'temp-select' : ''}`}
              onClick={e => selectOption(e, option)}
              key={option.value}
            >
              <div>{option.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Select;
