import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { ReminderCard } from "../components/ReminderCard";
import { ReminderService } from "../service/ReminderService";
import { MainLayout } from "../components/MainLayout";

const formatDate = (date) =>
    new Intl.DateTimeFormat("uk-UA", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);

const MainScreen = () => {
    const [reminders, setReminders] = useState([]);
    const [caption, setCaption] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(new Date());

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    useEffect(() => {
        const load = async () => {
            const data = await ReminderService.loadReminders();
            setReminders(data);
        };
        load();
    }, []);

    const addReminder = async () => {
        if (!caption || !description) return;

        const newReminder = await ReminderService.addReminder({
            caption,
            description,
            datetime: date.toISOString(),
        });

        setReminders((prev) => [newReminder, ...prev]);
        setCaption("");
        setDescription("");
        setDate(new Date());
    };

    const onSelectDate = (event, selectedDate) => {
        if (event.type === "dismissed" || !selectedDate) {
            setShowDatePicker(false);
            return;
        }

        const updatedDate = new Date(date);
        updatedDate.setFullYear(selectedDate.getFullYear());
        updatedDate.setMonth(selectedDate.getMonth());
        updatedDate.setDate(selectedDate.getDate());

        setDate(updatedDate);
        setShowDatePicker(false);
        setShowTimePicker(true);
    };

    const onSelectTime = (event, selectedTime) => {
        if (event.type === "dismissed" || !selectedTime) {
            setShowTimePicker(false);
            return;
        }

        const updatedDate = new Date(date);
        updatedDate.setHours(selectedTime.getHours());
        updatedDate.setMinutes(selectedTime.getMinutes());

        if (updatedDate < new Date()) {
            alert("Не можна обрати час у минулому ⏰");
            setShowTimePicker(false);
            return;
        }

        setDate(updatedDate);
        setShowTimePicker(false);
    };

    const handleDelete = async (reminder) => {
        await ReminderService.deleteReminder(reminder);
        setReminders((prev) => prev.filter((r) => r.id !== reminder.id));
    };

    return (
        <MainLayout
            caption={caption}
            setCaption={setCaption}
            description={description}
            setDescription={setDescription}
            date={date}
            formatDate={formatDate}
            handleDateTimePress={() => setShowDatePicker(true)}
            addReminder={addReminder}
            reminders={reminders}
            onDelete={handleDelete}
        >
            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode={Platform.OS === "ios" ? "datetime" : "date"}
                    is24Hour={true}
                    display="default"
                    minimumDate={new Date()}
                    onChange={onSelectDate}
                />
            )}

            {showTimePicker && Platform.OS === "android" && (
                <DateTimePicker value={date} mode="time" is24Hour={true} display="default" onChange={onSelectTime} />
            )}
        </MainLayout>
    );
};

export default MainScreen;
