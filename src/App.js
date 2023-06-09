import './App.css';
import { useSelector, useDispatch, connect } from 'react-redux'
import { clearData, fetchData, incrementId, decrementId, inputId } from './features/dataSlice'
import { useEffect } from 'react';

function App(props) {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.data)

  const renderImg = () => {
    if(data.apiData) {
      return <div>
        <h1 >{data.apiData.title}</h1>
        <img style={{'width': '65vw', borderRadius: '15px'}} src={data.apiData.primaryImage} alt={data.apiData.title} />
        </div>
    } else {
      return <p>image here</p>
    }
  }

  useEffect(() => {
    dispatch(fetchData())
  }, [props.objectId, dispatch])


  return (
    <div className="App" style={{background: '#ffe381', borderRadius:'20px', paddingTop:'10px'}}>
      <div>
        <button onClick={() => dispatch(fetchData())}>Thunk!</button>
        <button onClick={() => dispatch(clearData())}>Clear</button>
        <button onClick={() => dispatch(incrementId())}>Next</button>
        <button onClick={() => dispatch(decrementId())}>Back</button>
      </div>
      <input value={ data.objectId } onChange={(e) => {
        dispatch(inputId(Number(e.target.value)))
      }} />
      <div>
        Id #{data.objectId} <br/>
        {renderImg()}
      </div>
    </div>
  );
}


const mapStateToProps = (state, ownProps) => ({ objectId: state.data.objectId })

export default connect(mapStateToProps)(App);