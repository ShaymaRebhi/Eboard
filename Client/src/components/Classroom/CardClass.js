import React , {useState,useEffect} from 'react';
import '../css/CardClass.css';
import CardItemClass from './CardItemClass';
import { Grid, Label, Segment ,  } from 'semantic-ui-react';
import {affichage, selectClass} from "../../redux/slices/ClassSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import {getclassByYear} from '../../utils/Class'





export default function CardClass (props) {
  const idUser=JSON.parse(localStorage.getItem("login")).User._id;
  console.log(idUser);
  const dispatch = useDispatch();
  const  classs = useSelector(selectClass );

  const [Cs,setCs] = useState([])

  const [pageNumber, setPageNumber] = useState(0);
  const [CsPerPage] = useState(3);
  const pagesVisited = pageNumber * CsPerPage ;

  const getClass=()=>{
    getclassByYear(idUser,"Active",(res)=> {
      setCs(res.data)
      console.log(res.data.classObjet)
    })
}
const aff = (id) => {
   return "Level " + id + "th";
  
};
  const fetchClass = async () => {
  
      const response = await axios.get(
          "http://localhost:3000/class/all"
      ).then(res => {setCs(res.data);console.log(res.data)});
    
  };
  useEffect(() => {
    getClass()
 
  }, [dispatch]);

  const pageCount = Math.ceil(Cs.length / CsPerPage);

  const changePage = ({ selected }) => {
  setPageNumber(selected);
  };
   
  return (
      
        
      <div className='cards__Class__wrapper'>
    {Cs?.map((cl, index) => (
      <Grid columns={1} rows={3} key ={index}>
    <Grid.Column>
      <Segment raised>
        <Label as='a' color='red' ribbon>
        {aff(cl._id)}

        </Label>
          <ul className='cards__Class__items' >
          
          {cl.classObjet?.slice(pagesVisited, pagesVisited + CsPerPage).map((f , i) => (
        <div  key={i}>
            <CardItemClass  
              src='images/react.jpeg'
              course={f.className}
              teacher='amine'
              class={f.classSection}
              meet ='IN MEETING NOW'
              path='/class'
              src1=""
              
            />
                 
                 </div>
            ))}
            
          
          </ul>
          
          <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
      </Segment>
      
      </Grid.Column>
      </Grid>
    ))}
      </div>
    
  );
}



