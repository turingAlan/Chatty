import { View,Text, StyleSheet } from "react-native"
import colors from "../constants/colors"
import PageContainer from "./PageContainer"


const PageTitle = (props)=>{
    return(
             <Text style = {styles.text}>
                {props.text}
            </Text>
    )
}

const styles  = StyleSheet.create({
    text:{
        color:colors.textColor,
        letterSpacing:0.3,
        fontFamily:"bold",
        fontSize:28

    }
})

export default PageTitle