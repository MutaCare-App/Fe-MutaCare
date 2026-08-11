import { Text } from "../ui/text";
import { View } from "react-native";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface FormInputProps extends React.ComponentProps<typeof Input>{
  label: string;
  icon?: React.ReactNode;
  error?: string;
}

export default function FormInput({ label, icon, error, ...props }: FormInputProps) {
    return (
        <View>
            <Label>{}label</Label>
            <Input>{icon}</Input>
        </View>
    )
}