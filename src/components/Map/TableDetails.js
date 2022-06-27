import React, {useState} from 'react';
import './style.css'
import { useTranslation } from 'react-i18next';
  export default function TableDetails(props) {
    const [isLoaded, setIsLoaded] = useState(true)
    debugger
    const {t} = useTranslation(["tableDetails"])
    let keys =null;
    let values = null
    debugger
    if (props.data){
      if (Object.keys(props.data).length>1){
        keys = Array.from(Object.keys(props.data))
        values = Array.from(Object.values(props.data))
    }else{
        keys = Object.keys(props.data[0])
        values = Object.values(props.data[0])
    }
    }    else{
      setIsLoaded(false)
      window.location.reload();

    }
    
    const list = []
    return (
      <>
      {isLoaded?
        <div className={"App"}>

        <div className={"tableContainer"}>
          <ul>
          {[0].map((_, key) => {
              for (let i=0; i<keys.length; i++){
                  
                  list.push (
                      <li className={"table-row"}>
                        {localStorage.getItem("i18nextLng")=="ar"?
                        <>
                        <div className={"col col-2 ar"} >{t(`${(keys[i])}`)}</div>
                        <div className={"col col-1 ar"} >{values[i]}</div>
                        </>
                        :
                        <>
                        <div className={"col col-1 en"} >{values[i]}</div>
                        <div className={"col col-2 en"} >{t(`${(keys[i])}`)}</div>
                        </>
                        }
                        
                      </li>
                    )
              }
              return list
          }
          )}
          </ul>
          </div>
      </div>:""
      }
      </>
    
    );
  }


