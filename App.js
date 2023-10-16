import React, {useState} from 'react';
import { View, SafeAreaView, StatusBar, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';

let timer = null; // Criada fora para um contexto mais global para a variável 
let segundos = 0;
let minutos = 0;
let horas = 0;

export default function Cronometro() {

  const[numero, setNumero] = useState('00:00:00') // Dentro da use state passa-se o valor a ser inicializado na tela
  const[botao, setBotao] = useState('Iniciar')
  const[ultimo, setUltimo] = useState('Área do tempo medido') //tudo aquilo que for modeuifucar ao longo do tempo utilzia-se o useState

function iniciar(){

  if(timer !== null){

    clearInterval(timer);
    timer = null;
    setBotao('Iniciar')

  }else{

    timer = setInterval(() => {
      segundos++;

      if(segundos == 60){
        segundos = 0;
        minutos++;
      }

      if(minutos == 60){
        minutos = 0;
        horas++;
      }

      let formatado = (horas < 10? '0' + horas: horas) + ':' +
      (minutos<10? '0' + minutos: minutos) + ':' + (segundos < 10? '0' + segundos: segundos);

      setNumero(formatado);
    }, 1000);

    setBotao('Parar');
  }
}

function zerar(){
  if(timer !== null){
    clearInterval(timer);
    timer = null;
  }

  setNumero('00:00:00')
  setUltimo(numero)

  segundos = 0;
  minutos = 0,
  horas = 0,

  setBotao('Iniciar')
  //setNumero('00:00:00');
}

 return (
   <SafeAreaView style = {styles.Container}>
    <StatusBar/>

    <Image
      source = {require('./src/images/crono.png')}
    />

    <Text style = {styles.tempo}>
      {numero == 0? '00:00:00': numero}
    </Text>

    <View style = {styles.viewBotao}>

      <TouchableOpacity style={styles.btn} onPress = {iniciar}>

        <Text style = {styles.btnText}>
          {botao}
        </Text>

      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={zerar}>

        <Text style = {styles.btnText}>
         Zerar
        </Text>

      </TouchableOpacity>
      
    </View>

    <Text style ={styles.tempoMedido}>
      {ultimo}
    </Text>


   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#D18EDB',
    alignItems: 'center',
    justifyContent: 'center'
  },

  tempo: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#ffff',
    marginTop: -150
  },

  viewBotao:{
    flexDirection: 'row',
    width: '100%',
    //gap: 10,
    justifyContent: 'space-around',
    marginTop: 130
  },

  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#ffff',
    width: 130,
    borderRadius: 9
  },

  btnText: {
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: 'bold'
  }, 

  tempoMedido: {
    fontSize: 30,
    fontStyle: 'italic',
    color: '#ffff',
    fontWeight: 'bold',
    marginTop: 40
  }
})