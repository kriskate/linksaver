import { UserModel } from '../../constants/Models'

import { LocalStorageHandler, WebStorageHandler } from './StorageUtils'


let defaultUserModel = new UserModel({}),
    _localStorage = new LocalStorageHandler(), _webStorage = new WebStorageHandler(),
    _userModel, offline, synchronized, sync

class Storage {

  init(props){
    offline = props.offline
    sync = props.sync

    if(props.username) defaultUserModel.username = props.username

    this.readData()
  }
  readData(){
    offline
    ? _localStorage.get().then(this.readData_done.bind(this)).catch(this.readData_fail.bind(this))
    : _webStorage.get().then(this.readData_done.bind(this)).catch(this.readData_fail.bind(this))
  }
  readData_done(data){
    if(!data){
      _userModel = defaultUserModel
      sync({ synchronized:true, userModel: _userModel, storageInitialized:true })
      this.saveData(_userModel)
    } else{
      _userModel = typeof(data) == 'object' ? data : JSON.parse(data)
      sync({ synchronized:true, userModel: _userModel })
    }
  }
  readData_fail(err){
    alert("Reading the data has failed! The application content will be reset. \r\n"+err)

    _userModel = defaultUserModel
    this.saveData(_userModel)
  }
  saveData(data) {
    let { id, username, pass, folders, pic, email } = data
    let setData = {
      id: id || _userModel.id, username: username || _userModel.username, pass: pass || _userModel.pass,
      folders: folders || _userModel.folders, pic: pic || _userModel.pic, email: email || _userModel.email
    }

    offline
    ? _localStorage.set(setData).then(this.saveData_done.bind(this)).catch(this.saveData_fail.bind(this))
    : _webStorage.set(setData).then(this.saveData_done.bind(this)).catch(this.saveData_fail.bind(this))
  }
  saveData_done(data){
    // great
    sync({synchronized: true})
  }
  saveData_fail(err){
    alert("Saving the data has failed! \r\n" + err)
  }
}


export default new Storage()
