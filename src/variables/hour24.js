
import { useState } from 'react';

const rows = [
    { id:0, name:'24시간'},
    { id:1, name:'2차병원'}
  ];
  
  
  function Hour24(){
    const [checkedIdsSet, setCheckedIdsSet] = useState(new Set());
    const numChecked = checkedIdsSet.size;
    
    const updateSet = (set, id) => {
      const updatedSet = new Set(set);
    
      if (updatedSet.has(id)) {
        updatedSet.delete(id);
      } else {
        updatedSet.add(id);
      }
    
      return updatedSet;
    };
    
    const handleOnChange = (id) => {
      setCheckedIdsSet((prevSet) => updateSet(prevSet, id));
    };
    
    const toggleAllCheckedById = ({ target: { checked } }) => {
      if (checked) {
        const allChecked = new Set(rows.map(({ id }) => id));
        setCheckedIdsSet(allChecked);
      } else {
        setCheckedIdsSet(new Set());
      }
    };
  
    return (
      <table>
        <thead>
          <tr>
            <th>
              
            </th>
           
          </tr>
          
          <tr style={{ textAlign: 'center' }}>                        
            <th>24hour</th>
          </tr>
  
        </thead>
        <tbody>
          {rows.map(({ id, name }) => (
            <tr key={id}>
              <td style={{ width: '20%' }}>
                <input
                  type='checkbox'
                  checked={checkedIdsSet.has(id)}
                  onChange={() => handleOnChange(id)}
                  style={{ transform: 'scale(0.7)', WebkitTransform: 'scale(0.7)', MozTransform: 'scale(0.7)' }}
                     />    
              </td>
              <td style={{ width: '80%', fontSize: '12px' }}>{name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  export default Hour24;
  