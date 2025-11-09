import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Message } from '../types';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../utils/theme';
import { formatTimeAgo } from '../utils/validation';

interface ChatBubbleProps {
  message: Message;
  isOwnMessage: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isOwnMessage }) => {
  return (
    <View style={[styles.container, isOwnMessage && styles.containerOwn]}>
      <View style={[styles.bubble, isOwnMessage ? styles.bubbleOwn : styles.bubbleOther]}>
        <Text style={[styles.text, isOwnMessage && styles.textOwn]}>{message.text}</Text>
      </View>
      <Text style={styles.time}>{formatTimeAgo(message.createdAt)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
    alignItems: 'flex-start',
    paddingHorizontal: SPACING.md,
  },
  containerOwn: {
    alignItems: 'flex-end',
  },
  bubble: {
    maxWidth: '75%',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  bubbleOwn: {
    backgroundColor: COLORS.primary,
  },
  bubbleOther: {
    backgroundColor: COLORS.grayLight,
  },
  text: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
  },
  textOwn: {
    color: COLORS.white,
  },
  time: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.grayDark,
    marginTop: 4,
  },
});
