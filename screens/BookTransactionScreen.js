import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component {
    constructor(){
      super();
      this.state = {
        hasCameraPermissions: null,
        scanned: false,
        scannedBookId: '',
        scannedStudentId:'',
        buttonState: 'normal'
      }
    }

    getCameraPermissions = async (id) =>{
      const {status} = await Permissions.askAsync(Permissions.CAMERA);
      
      this.setState({
        /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
        hasCameraPermissions: status === "granted",
        buttonState: id,
        scanned: false
      });
    }

    handleBarCodeScanned = async({type, data})=>{
      const {buttonState} = this.state

      if(buttonState==="BookId"){
        this.setState({
          scanned: true,
          scannedBookId: data,
          buttonState: 'normal'
        });
      }
      else if(buttonState==="StudentId"){
        this.setState({
          scanned: true,
          scannedStudentId: data,
          buttonState: 'normal'
        });
      }
      
    }
    initiateBookIssue = async ()=>{
      db.collection("transactions").add({
        studentid : this. state .scannedStudentId,
        bookid:this.state.scannedBookId,
        date:firebase.firestore .Timestamp.now().toDate(),
        transectiontype : "issue"
      })
      db.collection("books").doc(this . state. scannedBookId).update(
        {available:false}
      )
      db.collection("students").doc(this.state.scannedStudentId).update({
        numberofbooks:firebase.firestore.FieldValue.increment(1)
      })
    }
    initiateBookReturn = async ()=>{
      db.collection("transactions").add({
        studentid : this. state .scannedStudentId,
        bookid:this.state.scannedBookId,
        date:firebase.firestore .Timestamp.now().toDate(),
        transectiontype : "return"
      })
      db.collection("books").doc(this . state. scannedBookId).update(
        {available:true}
      )
      db.collection("students").doc(this.state.scannedStudentId).update({
        numberofbooks:firebase.firestore.FieldValue.increment(-1)
      })
    handletransection  = async ()=>{
      await db.collection("students").where("studentid","==",this.state.scannedStudentId).get()
      var isstudentalegable = ""
      if(studentref.docs.length ==0){
        this.setState ({
          scannedStudentId:'',
          scannedBookId:''            
          )}
        })
      }
      var transactionMessage
      db.collection("books").doc(this . state. scannedBookId).get()
      .then(doc=>{
        var book = doc.data() 
        if(book.available){ this.initiateBookIssue();
           transactionMessage = "Book Issued" ;
            alert(transactionMessage) } 
            else{ this.initiateBookReturn(); 
              transactionMessage = "Book Returned" ; 
              alert(transactionMessage) }

      })

    }
  }


    render() {
      const hasCameraPermissions = this.state.hasCameraPermissions;
      const scanned = this.state.scanned;
      const buttonState = this.state.buttonState;

      if (buttonState !== "normal" && hasCameraPermissions){
        return(
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        );
      }
    

      else if (buttonState === "normal"){
        return(
          <View style={styles.container}>
            <View>
              <Image
                source={require("../assets/booklogo.jpg")}
                style={{width:200, height: 200}}/>
              <Text style={{textAlign: 'center', fontSize: 30}}>Wily</Text>
            </View>
            <View style={styles.inputView}>
            <TextInput 
              style={styles.inputBox}
              placeholder="Book Id"
              value={this.state.scannedBookId}/>
            <TouchableOpacity 
              style={styles.scanButton}
              onPress={()=>{
                this.getCameraPermissions("BookId")
              }}>
              <Text style={styles.buttonText}>Scan</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.inputView}>
            <TextInput 
              style={styles.inputBox}
              placeholder="Student Id"
              value={this.state.scannedStudentId}/>
            <TouchableOpacity 
              style={styles.scanButton}
              onPress={()=>{
                this.getCameraPermissions("StudentId")
              }}>
              <Text style={styles.buttonText}>Scan</Text>
            </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.submitButton} 
            onPress={async()=>{ 
              var transactionMessage = this.handletransection();
             this.setState( {scannedBookId:'', scannedStudentId:''}) }}> 
            <Text>
              submit
            </Text>
              </TouchableOpacity>

          </View>
        );
      }
    }
  
    }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 15,
      textAlign: 'center',
      marginTop: 10
    },
    inputView:{
      flexDirection: 'row',
      margin: 20
    },
    inputBox:{
      width: 200,
      height: 40,
      borderWidth: 1.5,
      borderRightWidth: 0,
      fontSize: 20
    },
    scanButton:{
      backgroundColor: '#66BB6A',
      width: 50,
      borderWidth: 1.5,
      borderLeftWidth: 0
    }
  })