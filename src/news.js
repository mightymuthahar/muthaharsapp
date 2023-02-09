import "./news.css";
import {useEffect} from "react";
import {useState} from "react";
import axios from "axios";
import ReactPaginate from 'react-paginate';

const categories=["business","entertainment","general","health","science","sports","technology"];
const Newsapp=()=>{
    const[news,setnews]=useState([]);
    const[category,setcategory]=useState("general");
    const[loaders,setloaders]=useState(false);
    const[totalrecords,settotalrecords]=useState(0);
    const[pagenum,setpagenum]=useState(1);
    const Loadnews=()=>{
        setloaders(true);
        setTimeout(()=>{
        axios({
            method:"GET",
            url:"https://newsapi.org/v2/top-headlines",
            params:{
                country:"in",
                apikey:"87e85c1ff23c496e95d14b747ed6e85b",
                category:category ,
                page:pagenum
                         
            }
        }).then((res)=>{
            setnews(res.data.articles);  
            settotalrecords(res.data.totalResults);
                 
        }).catch((error)=>{}).finally(()=>{setloaders(false)})},3000)
    }
    useEffect(()=>{Loadnews()},[])
    useEffect(()=>{Loadnews()},[category,pagenum])
    return(
        <>
        <div id="id1">
            <img src="n2.png" id="id5" alt="unable to display"></img>
            <h2 id="id2">MUTHAHAR'S NATIONAL REPORTS</h2>
            <div id="id6">
                <img src="n1 (1).png" id="id7" alt="unable to display"></img>
                <p id="id8">Get App</p>
                </div>&nbsp; &nbsp;
                <img id="id9" src="n3.png" alt="unable to display"></img>
                </div>
            <div id="id4">
                {
                    categories.map((item,index)=>{
                        return(
                            <button className={(category===item)? "btn btn-danger":"btn btn-primary"} style={{margin:10}} onClick={()=>{setcategory(item)}} key={index} >{item}</button>
                        )
                    })
                }
            </div>
            <div>
    <ReactPaginate
    nextLabel="next >"
    previousLabel="< previous"
    pageClassName="page-item"
    pageLinkClassName="page-link"
    previousClassName="page-item"
    previousLinkClassName="page-link"
    nextClassName="page-item"
    nextLinkClassName="page-link"
    breakLabel="..."
    breakClassName="page-item"
    breakLinkClassName="page-link"
    containerClassName="pagination"
    activeClassName="active"
    renderOnZeroPageCount={null}
    pageCount={Math.ceil(totalrecords/20)}
    onPageChange={(res)=>{
        setpagenum(res.selected+1);
    }}
    /></div>
           {
            loaders ? (<div className="spinner-border" role="status" >
            
          </div>):null
           }
           
            <div id="id3">
                {
                    news.map((item,ind)=>{
                        return(
                            <div className="card" style={{width:"18rem",margin:10,backgroundColor:"greenyellow"}} key={ind}>
                            <img className="card-img-top" src={item.urlToImage} alt="Unable to display"></img>
                            <div className="card-body">
                              <h5 className="card-title">{item.title}</h5>
                              <p className="card-text">{item.description }</p>
                            </div>
                          </div>
                        )
                    })
}</div>

    </>
    )
    }
export default Newsapp;