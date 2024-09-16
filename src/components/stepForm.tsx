import React, { createContext, useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

// Importe os componentes necessários do seu design system
import { Button } from "@/components/ui/button";
import { Text } from "./ui/text";

interface StepFormContextValue {
  currentStep: number;
  formData: { [key: string]: any };
  setFormValue: (key: string, value: any) => void;
  next: () => void;
  prev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  onSubmit: (formData: { [key: string]: any }) => void;
}

const StepFormContext = createContext<StepFormContextValue | null>(null);

interface StepFormProps {
  children: React.ReactNode;
  onSubmit: (valaue: any) => void;
}

const StepForm: React.FC<StepFormProps> & {
  Step: typeof Step;
  Navigation: typeof Navigation;
} = ({ children, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const next = () =>
    setCurrentStep((prev) =>
      Math.min(prev + 1, React.Children.count(children) - 1)
    );
  const prev = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const setFormValue = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const contextValue: StepFormContextValue = {
    currentStep,
    formData,
    setFormValue,
    next,
    prev,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === React.Children.count(children) - 1,
    onSubmit,
  };

  return (
    <StepFormContext.Provider value={contextValue}>
      <Animated.View
        entering={FadeIn.duration(300)}
        exiting={FadeOut.duration(300)}
        className={""}
        style={styles.container}
      >
        <View style={styles.form}>{children}</View>
      </Animated.View>
    </StepFormContext.Provider>
  );
};

interface StepProps {
  children: React.ReactNode;
  title: string;
}

const Step: React.FC<StepProps> = ({ children, title }) => {
  const { currentStep } = useContext(StepFormContext) as StepFormContextValue;
  const isActive = React.Children.toArray(children)[currentStep];

  if (!isActive) return null;

  return (
    <View style={styles.step}>
      <Animated.View
        entering={FadeIn.duration(300)}
        exiting={FadeOut.duration(300)}
      >
        {isActive}
      </Animated.View>
    </View>
  );
};

interface NavigationProps {
  submitText?: string;
}

const Navigation: React.FC<NavigationProps> = ({ submitText = "Enviar" }) => {
  const { prev, next, isFirstStep, isLastStep, onSubmit, formData } =
    useContext(StepFormContext) as StepFormContextValue;

  return (
    <View style={styles.footer}>
      {!isFirstStep && (
        <Button onPress={prev} variant="outline">
          <Text>Anterior</Text>
        </Button>
      )}
      {!isLastStep && (
        <Button onPress={next} style={styles.nextButton}>
          <Text>Próximo</Text>
        </Button>
      )}
      {isLastStep && (
        <Button onPress={() => onSubmit(formData)} style={styles.nextButton}>
          <Text>{submitText}</Text>
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  form: {
    width: "100%",
    maxWidth: 550,
  },
  step: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nextButton: {
    marginLeft: "auto",
  },
});

StepForm.Step = Step;
StepForm.Navigation = Navigation;

export default StepForm;
