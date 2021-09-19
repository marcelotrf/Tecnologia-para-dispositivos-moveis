import * as React from 'react';
import { Text, View, StyleSheet,FlatList,Pressable, Image,Modal } from 'react-native';
import Constants from 'expo-constants';

async function executeGet(url,jsonState){
    //get síncrono com o uso do fetch
    await fetch(url)
    .then(response => {
          if (response.status === 200) {
            //console.log('sucesso');
            response.json().then(function(result){ 

              //console.log(result);
              jsonState(result)

              });
          } else {
            throw new Error('Erro ao consumir a API!');
          }
      })
      .then(response => {
        //console.debug(response);
      }).catch(error => {
        console.error(error);
      });
  }


const Pessoa = ({userId,title,city,website}) => {

    //state para controle do Modal
    const [modal,setModal] = React.useState(false)

    function mudaModal(){
      setModal(!modal)
    }

    return(
    
    <View>
    
      <ShowDetalhes display={modal} toogleModal={mudaModal} mensagem={city} mensagem2={website}/>
      
      <Pressable onPress={mudaModal}>
               
        <Text style={styles.paragraph}>{userId}</Text>
        <Text style={styles.paragraph}>{title}</Text>
      </Pressable>
    </View>
    )
}

const ShowDetalhes = ({display,toogleModal,mensagem,mensagem2}) => (   
    <Modal
          animationType="slide"
          transparent={true}
          visible={display}
          onRequestClose={toogleModal}
    >

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
                <Pressable onPress={toogleModal}>
                  <Text>{mensagem}</Text>
                  <Text>{mensagem2}</Text>
                </Pressable>
          </View>
        </View>
    
    </Modal>
        
 )

 const Cabecalho = () => {
   return (
    <View style={styles.cabecalho}>
      <Text style={styles.cabecalhoTexto}>
        Lista cabeçalho ADO2
      </Text>

    </View>

   )
  

 }


export default function App() {

  const [jsonData,setJsonData] = React.useState({})

  executeGet("https://my-json-server.typicode.com/marcelotrf/Tecnologia-para-dispositivos-moveis/db",setJsonData)

//função que renderiza cada item do FlatList
  function meuItem({item}){    
    
    return(
      //criar a funcao Pessoa fora do App
      <Pessoa userId={item.userId} 
              title={item.title}
              city={item.city}
              website={item.website}
              completed={item.completed}
      />
    )
  }

  return (
    
    <View style={styles.container}>

      <FlatList
      
      //Data dados no formato json
        data={jsonData.data}
        //criar a funcao meuItem em App
        renderItem={meuItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={Cabecalho}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cabecalho: {
    width:'100%',
    height:45,
    backgroundColor:'#606070'
  },
  cabecalhoTexto: {
    //alinhamento horizontal
    textAlign:"center",
    fontSize: 24,
   // alinhamento vertical
    padding:7
  }
});
