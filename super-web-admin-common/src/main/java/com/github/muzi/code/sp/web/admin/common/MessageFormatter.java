package com.github.muzi.code.sp.web.admin.common;


import java.text.MessageFormat;
import java.util.HashMap;
import java.util.Map;

public class MessageFormatter {
    private static final char	ESCAPE_CHAR	= '\\';

    /**
     * 替代String.format使用
     */
    public static String stringFormat(String format, Object...argArray) {
        return getMessage(format, argArray, "%s");
    }

    /**
     * 替代MessageFormat使用
     */
    public static String messageFormat(String format, Object...argArray) {
        MessageFormat msgFmt = new MessageFormat(format);
        return msgFmt.format(argArray).toString();
    }

    /**
     * 修复JSON内容,自动去除NULL字段和多余逗号
     */
    public static String jsonRepair(String errJson) {
        return errJson == null ? null : errJson.replaceAll("\"\\w+\":\"?null\"?", "").replaceAll("^\\{,+", "{").replaceAll(",+}$", "}");
    }


    public static String getMessage(String format, Object[] argArray, String delimStr) {
        if (format == null) { return null; }
        if (argArray == null) { return format; }
        int start = 0;
        int index;

        StringBuilder sbuf = new StringBuilder(format.length() + 50);

        for (int i = 0; i < argArray.length; i++) {
            index = format.indexOf(delimStr, start);
            if (index == -1) {
                // 无匹配
                if (start == 0) {
                    return format;
                } else {
                    sbuf.append(format.substring(start, format.length()));
                    return sbuf.toString();
                }
            } else {
                if (isEscapedDelimeter(format, index)) {
                    if (!isDoubleEscaped(format, index)) {
                        i--;
                        sbuf.append(format.substring(start, index - 1));
                        sbuf.append(format.charAt(index));
                        start = index + 1;
                    } else {
                        sbuf.append(format.substring(start, index - 1));
                        deeplyAppendParameter(sbuf, argArray[i], new HashMap<Object[], Object>());
                        start = index + 2;
                    }
                } else {
                    sbuf.append(format.substring(start, index));
                    deeplyAppendParameter(sbuf, argArray[i], new HashMap<Object[], Object>());
                    start = index + 2;
                }
            }
        }
        sbuf.append(format.substring(start, format.length()));

        return sbuf.toString();

    }

    /**
     * 判断是否转义
     */
    static boolean isEscapedDelimeter(String messagePattern, int delimeterStartIndex) {
        if (delimeterStartIndex == 0) { return false; }
        char potentialEscape = messagePattern.charAt(delimeterStartIndex - 1);
        if (potentialEscape == ESCAPE_CHAR) {
            return true;
        } else {
            return false;
        }
    }

    static boolean isDoubleEscaped(String messagePattern, int delimeterStartIndex) {
        if (delimeterStartIndex >= 2 && messagePattern.charAt(delimeterStartIndex - 2) == ESCAPE_CHAR) {
            return true;
        } else {
            return false;
        }
    }

    private static void deeplyAppendParameter(StringBuilder sbuf, Object o, Map<Object[], Object> seenMap) {
        if (o == null) {
            sbuf.append("null");
            return;
        }
        if (!o.getClass().isArray()) {
            safeObjectAppend(sbuf, o);
        } else {
            if (o instanceof boolean[]) {
                booleanArrayAppend(sbuf, (boolean[]) o);
            } else if (o instanceof byte[]) {
                byteArrayAppend(sbuf, (byte[]) o);
            } else if (o instanceof char[]) {
                charArrayAppend(sbuf, (char[]) o);
            } else if (o instanceof short[]) {
                shortArrayAppend(sbuf, (short[]) o);
            } else if (o instanceof int[]) {
                intArrayAppend(sbuf, (int[]) o);
            } else if (o instanceof long[]) {
                longArrayAppend(sbuf, (long[]) o);
            } else if (o instanceof float[]) {
                floatArrayAppend(sbuf, (float[]) o);
            } else if (o instanceof double[]) {
                doubleArrayAppend(sbuf, (double[]) o);
            } else {
                objectArrayAppend(sbuf, (Object[]) o, seenMap);
            }
        }
    }

    private static void safeObjectAppend(StringBuilder sbuf, Object o) {
        try {
            String oAsString = o.toString();
            sbuf.append(oAsString);
        } catch (Throwable t) {
            sbuf.append("[FAILED toString()]");
        }

    }

    private static void objectArrayAppend(StringBuilder sbuf, Object[] a, Map<Object[], Object> seenMap) {
        sbuf.append('[');
        if (!seenMap.containsKey(a)) {
            seenMap.put(a, null);
            final int len = a.length;
            for (int i = 0; i < len; i++) {
                deeplyAppendParameter(sbuf, a[i], seenMap);
                if (i != len - 1) sbuf.append(", ");
            }
            seenMap.remove(a);
        } else {
            sbuf.append("...");
        }
        sbuf.append(']');
    }

    private static void booleanArrayAppend(StringBuilder sbuf, boolean[] a) {
        sbuf.append('[');
        final int len = a.length;
        for (int i = 0; i < len; i++) {
            sbuf.append(a[i]);
            if (i != len - 1) sbuf.append(", ");
        }
        sbuf.append(']');
    }

    private static void byteArrayAppend(StringBuilder sbuf, byte[] a) {
        sbuf.append('[');
        final int len = a.length;
        for (int i = 0; i < len; i++) {
            sbuf.append(a[i]);
            if (i != len - 1) sbuf.append(", ");
        }
        sbuf.append(']');
    }

    private static void charArrayAppend(StringBuilder sbuf, char[] a) {
        sbuf.append('[');
        final int len = a.length;
        for (int i = 0; i < len; i++) {
            sbuf.append(a[i]);
            if (i != len - 1) sbuf.append(", ");
        }
        sbuf.append(']');
    }

    private static void shortArrayAppend(StringBuilder sbuf, short[] a) {
        sbuf.append('[');
        final int len = a.length;
        for (int i = 0; i < len; i++) {
            sbuf.append(a[i]);
            if (i != len - 1) sbuf.append(", ");
        }
        sbuf.append(']');
    }

    private static void intArrayAppend(StringBuilder sbuf, int[] a) {
        sbuf.append('[');
        final int len = a.length;
        for (int i = 0; i < len; i++) {
            sbuf.append(a[i]);
            if (i != len - 1) sbuf.append(", ");
        }
        sbuf.append(']');
    }

    private static void longArrayAppend(StringBuilder sbuf, long[] a) {
        sbuf.append('[');
        final int len = a.length;
        for (int i = 0; i < len; i++) {
            sbuf.append(a[i]);
            if (i != len - 1) sbuf.append(", ");
        }
        sbuf.append(']');
    }

    private static void floatArrayAppend(StringBuilder sbuf, float[] a) {
        sbuf.append('[');
        final int len = a.length;
        for (int i = 0; i < len; i++) {
            sbuf.append(a[i]);
            if (i != len - 1) sbuf.append(", ");
        }
        sbuf.append(']');
    }

    private static void doubleArrayAppend(StringBuilder sbuf, double[] a) {
        sbuf.append('[');
        final int len = a.length;
        for (int i = 0; i < len; i++) {
            sbuf.append(a[i]);
            if (i != len - 1) sbuf.append(", ");
        }
        sbuf.append(']');
    }
}
