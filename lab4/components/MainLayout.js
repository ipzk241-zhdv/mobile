import React from "react";
import styled from "styled-components/native";
import { ReminderCard } from "./ReminderCard";

export const MainLayout = ({
    caption,
    setCaption,
    description,
    setDescription,
    date,
    formatDate,
    handleDateTimePress,
    addReminder,
    reminders,
    onDelete,
    children,
}) => {
    return (
        <Container>
            <CaptionText>📝 To-Do Reminder</CaptionText>
            <Input placeholder="Назва" value={caption} onChangeText={setCaption} />
            <Input placeholder="Опис" value={description} onChangeText={setDescription} />

            <DateSelector onPress={handleDateTimePress}>
                <DateText>Обрати час: {formatDate(date)}</DateText>
            </DateSelector>

            <AddButton onPress={addReminder}>
                <AddButtonText>ДОДАТИ НАГАДУВАННЯ</AddButtonText>
            </AddButton>

            {children}

            <ScrollArea>
                {reminders.map((reminder) => (
                    <ReminderCard
                        key={reminder.id}
                        caption={reminder.caption}
                        description={reminder.description}
                        datetime={formatDate(new Date(reminder.datetime))}
                        onDelete={() => onDelete(reminder)}
                    />
                ))}
            </ScrollArea>
        </Container>
    );
};

const Container = styled.View`
    padding: 20px;
    flex: 1;
    background-color: #fff;
`;

const CaptionText = styled.Text`
    font-size: 25px;
    text-align: center;
    font-weight: bold;
    margin-vertical: 25px;
`;

const Input = styled.TextInput`
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
    margin-bottom: 10px;
`;

const DateSelector = styled.TouchableOpacity`
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
    margin-bottom: 10px;
    justify-content: center;
`;

const DateText = styled.Text`
    color: #333;
`;

const AddButton = styled.TouchableOpacity`
    background-color: #2196f3;
    padding: 12px;
    border-radius: 8px;
    align-items: center;
    margin-bottom: 20px;
`;

const AddButtonText = styled.Text`
    color: #fff;
    font-weight: bold;
`;

const ScrollArea = styled.ScrollView`
    flex: 1;
`;
