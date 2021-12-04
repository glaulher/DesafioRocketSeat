import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png';
import penIcon from '../assets/icons/edit/edit.png';


export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TaskItemProps {
  item: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (taskId: number,taskNewTitle: string) => void;
}

export function TaskItem({ item, toggleTaskDone, removeTask, editTask }: TaskItemProps){
  const [edit, setEdit] = useState(false);
  const [taskUpdate, setTaskUpdate] = useState(item.title);

  const textInputRef = useRef<TextInput>(null)


  useEffect(() => {
    if (textInputRef.current) {
      if (edit) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [edit]);

  function handleStartEdit(){
    setEdit(true)
  }

  function handleCancelEdit(){
    setTaskUpdate(item.title)
    setEdit(false)
  }

  function handleSubmitEdit(){
    editTask(item.id,taskUpdate)
    setEdit(false)
  }


  return(
     <>
      <View>
        <TouchableOpacity
          
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View
            
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {item.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          {edit ? (
            <TextInput
              value={taskUpdate}
              onChangeText={(event) => setTaskUpdate(event)}
              editable={edit}
              onSubmitEditing={handleSubmitEdit}
              returnKeyType="send"
              style={item.done ? styles.taskTextDone : styles.taskText}
              ref={textInputRef}
            />
          ) : (
            <Text style={item.done ? styles.taskTextDone : styles.taskText}>
              {item.title}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        {edit ? (
          <TouchableOpacity
           
            style={{ paddingHorizontal: 24 }}
            onPress={() => handleCancelEdit()}
          >
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
           
            style={{ paddingHorizontal: 24 }}
            onPress={() => handleStartEdit()}
          >
            <Image source={penIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.divider} />

        <TouchableOpacity
          
          style={{ paddingHorizontal: 24 }}
          onPress={() => removeTask(item.id)}
          disabled={edit}
        >
          <Image source={trashIcon} style={{ opacity: edit ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </>
  );
}


const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  divider: {
    borderColor: "rgba(196, 196, 196, 0.24)",
    height: 24,
    width: 0,
    borderWidth: 1,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

