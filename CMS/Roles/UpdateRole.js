import { Component } from 'react';
import React from 'react';
import { Toast } from 'primereact/toast';
import axios from "axios";
import LoadingIcon from "../../LoadingIcon";
import { CmsUpdateRole, CmsGetPermissionsExcept } from '../../API';
import Multiselect from 'multiselect-react-dropdown';

class UpdateRole extends Component {
    state = {
        loading: false,
        name: this.props.name,
        multiselectRef: React.createRef(),
        selectedItems: this.props.selectedPermissions,
        AvaliableSelect: [],
        deletedPermissions: [],
    }
    componentDidMount() {
        console.log(this.props.selectedPermissions)
    }
    updateRole = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        let permissions = [];
        let delete_permission = [];
        let params;



        let difference = this.state.selectedItems.filter(x => this.props.selectedPermissions.indexOf(x) === -1);
        // console.log(difference);

        for (let i = 0; i < difference.length; i++) {
            permissions.push(difference[i].id)
        }
        for (let i = 0; i < this.state.deletedPermissions.length; i++) {
            delete_permission[i] = this.state.deletedPermissions[i].id
        }
        // if (JSON.stringify(this.state.selectedItems) == JSON.stringify(this.props.selectedPermissions)) {
        //     console.log(JSON.stringify(this.state.selectedItems) == JSON.stringify(this.props.selectedPermissions))
        //     params = {
        //         name: this.state.name,
        //         delete_permission: delete_permission,
        //     }
        // }
        // else {
            console.log(permissions)
            params = {
                name: this.state.name,
                permission: permissions,
                delete_permission: delete_permission,
            }
        // }

        axios.post(CmsUpdateRole + this.props.id, params).then(
            res => {
                if (res.data.status == true) {
                    this.setState({ loading: false });
                    this.showSuccess(res.data.message)
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                } else {
                    this.setState({ loading: false });
                    this.showError(res.data.message)
                }
            }).catch(err => console.error(err));
    }
    getPermissionsExcept = () => {
        let except = [];
        for (let i = 0; i < this.state.selectedItems.length; i++) {
            except[i] = this.state.selectedItems[i].id
        }
        // console.log(this.state.rolePermission)
        let params = {
            except: except,
        }
        axios.post(CmsGetPermissionsExcept, params).then(
            res => {
                if (res.data.status == true) {
                    // console.log(res.data)
                    this.setState({ AvaliableSelect: res.data.data });
                }
            }).catch(err => console.error(err));
    }
    selectHandler = (e) => {
        let selecting = this.state.multiselectRef.current.getSelectedItems();
        console.log(selecting)
        this.setState({ selectedItems: selecting })
    }
    removePermission = (selectedList, removedItem) => {
        const filtered = selectedList.filter(obj => {
            return obj != removedItem;
        });
        this.setState({
            selectedItems: filtered
        })
        this.state.deletedPermissions.push(removedItem)
    }
    showSuccess = (msg) => {
        this.toastSuccess.show({ severity: 'success', summary: '????????', detail: msg, life: 3000 });
        console.log(this.state.parentID)
    }
    showError = (msg) => {
        this.toastFailure.show({ severity: 'error', summary: '??????', detail: msg, life: 3000 });
    }
    render() {
        return (
            <form className='container' onSubmit={this.updateRole}>
                <Toast ref={(el) => this.toastSuccess = el} position="bottom-right" />
                <Toast ref={(el) => this.toastFailure = el} position="bottom-right" />
                <div className="form-group wrapper" >
                    <div className="container mt-3">
                        <h6 className="mt-2 text-right">
                            :?????????? ?????? ??????????
                        </h6>
                        <input className="form-control " defaultValue={this.state.name} onChange={e => this.setState({ name: e.target.value })} placeholder="Role Name" />
                    </div>
                    <div className="container mt-3">
                        <h6 className="mt-2 text-right">
                            :?????????? ?????????????????? ???????????? ????????????
                        </h6>
                        <div onClick={this.getPermissionsExcept}>
                            <Multiselect
                                selectedValues={this.state.selectedItems}
                                onRemove={this.removePermission}
                                onSelect={this.selectHandler}
                                className="Multiselect"
                                options={this.state.AvaliableSelect}
                                displayValue="name"
                                ref={this.state.multiselectRef}
                                placeholder=" ???????????? ??????????????????"
                                showArrow={true}
                            />
                        </div>
                    </div>
                </div>
                <button className="float-left btn btn-outline-success mb-4 m-3" type="submit">
                    <div className="container">
                        <LoadingIcon size="25px" loading={this.state.loading} />
                        {!this.state.loading && <><i className="fa fa-save mr-1"></i> ??????????</>}
                    </div>
                </button>
            </form >
        );
    }
}

export default UpdateRole;