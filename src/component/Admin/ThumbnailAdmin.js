import  React,{useEffect,useState} from "react";
import { Link } from 'react-router-dom';
import axios from 'axios'
import UserService from "../../services/user.service";

function ThumbnailAdmin(props)
{
   
    const [details, setDetails] = useState({name:"",username:"",address:"",phone:"",role:"",active:""})
    useEffect(() => {
        UserService.getUser(props.id).then(res => {
                setDetails(res.data)
        }).catch(err => console.log(err))
    })
    const handleChange = event =>{
        setDetails({...details,[event.target.name]:event.target.value});
    }
    
    var role = details.role == 3 ? 'Admin' : details.role == 2 ? 'Host' : 'User';
   
    return(
        <table class="table manage-candidates-top mb-0" >
            <tbody>
            <tr class="candidates-list">
                <td class="title">
                <div class="thumb">
                    <img class="img-fluid" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" />
                </div>
                <div class="candidate-list-details">
                    <div class="candidate-list-info">
                    <div class="candidate-list-title">
                        <h5 class="mb-0"><Link to="/">{details.username}</Link></h5>
                    </div>
                    <div class="candidate-list-option">
                        <ul class="list-unstyled">
                        <li><i class="fas fa-filter pr-1"></i>{details.phone}</li>
                        <li><i class="fas fa-map-marker-alt pr-1"></i>{details.address}</li>
                        </ul>
                    </div>
                    </div>
                </div>
                </td>
                <td class="candidate-list-favourite-time text-center">
                <Link class="candidate-list-favourite order-2 text-danger" to="/"><i class="fas fa-heart"></i></Link>
                <span class="candidate-list-time order-1">{role}</span>
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