import * as Haptics from 'expo-haptics';

export const triggerHapticPattern = async () => {
    try {
        // Trigger a light impact
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        await delay(200); // Wait 100 milliseconds

        // Trigger a medium impact
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        await delay(600); // Wait another 100 milliseconds
        // Trigger a medium impact

        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        await delay(200); // Wait another 100 milliseconds

        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        await delay(600); // Wait another 100 milliseconds

        // Trigger a notification feedback for success
        //await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
        console.error(error);
    }

};

// Utility to delay execution
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const simpleHaptic = async () => {
    try {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
        console.error(error);
    }
}