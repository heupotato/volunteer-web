import  React,{useEffect,useState} from "react";
import { Link } from 'react-router-dom';
import axios from 'axios'
import UserService from "../../services/user.service";

function ThumbnailAdmin(props)
{
    const [details, setDetails] = useState({name:"",username:"",address:"",phone:"",role:"",active:"", avatar:""})
    useEffect(() => {
        UserService.getUser(props.id).then(res => {
                setDetails(res.data)
        }).catch(err => console.log(err))
    })
    console.log(details);
    var role = details.role == 3 ? 'Admin' : details.role == 2 ? 'Host' : 'User';
   
    return(
        <table class="table manage-candidates-top mb-0" >
            <tbody>
            <tr class="candidates-list">
                <td class="title">
                <div class="thumb">
                    <img class="img-fluid" src={details.avatar} alt="" />
                </div>
                <div class="candidate-list-details col-sm-5">
                        <h5 class="mb-0" style={{color:'#DD0000'}}>{details.username}</h5>   
                        <h7>Name: {details.name}</h7><br />
                        <h7>Role: {role}</h7>
                        <ul class="list-unstyled">
                        <li><i class="fas fa-filter pr-1"></i>{details.phone}</li>
                        <li><i class="fas fa-map-marker-alt pr-1"></i>{details.address}</li>
                        </ul>
                </div>
                </td>
                <td>
                <ul class="list-unstyled mb-0 d-flex justify-content-end" >
                    <li><Link to={"/edit/" + props.id} class="text-primary" data-toggle="tooltip" title="" data-original-title="view"><i class="far fa-eye"></i></Link></li>
                    <li><div class="form-check form-switch"><input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked={details.active ? "checked" : ''} /></div></li>
                </ul>
                </td>
            </tr>
            
            </tbody>
        </table>
    );
}

export default ThumbnailAdmin; 