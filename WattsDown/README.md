# Using React Paper components
Examle where the "TextInput" component is used
```ts
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import * as React from 'react'

export default function Example() {
    const [text, setText] = React.useState("");
    return(
        <TextInput
            label="Energy"
            value={text}
            onChangeText={text => setText(text)}
        />
    )
}
```

All components and how to use them, can be found here:
https://callstack.github.io/react-native-paper/docs/components/ActivityIndicator