
import { Button as RNPB } from 'react-native-paper';
import { Button as RNB } from 'react-native';
import { isAndroid } from '../../utils/env';

const Button = (props) => {
    return isAndroid ? <RNB onPress={props.onPress} style={{ ...props.style }} >{props.children}</RNB> : <RNPB onPress={props.onPress} style={{ ...props.style }} >{props.children}</RNPB>;
}

export default Button;