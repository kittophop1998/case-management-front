
// array values
{/* 
    <p>{{ selected }}</p>
    <checkbox
      v-model="selected"
      label="John"
      value="John"
    ></checkbox>
    <checkbox
      v-model="selected"
      label="Jacob"
      value="Jacob"
    ></checkbox>
 */}
// boolean values
//   <checkbox
//       v-model="checkbox1"
//       :label="`Checkbox 1: ${checkbox1.toString()}`"
//     ></checkbox>
//     <checkbox
//       v-model="checkbox2"
//       :label="`Checkbox 2: ${checkbox2.toString()}`"
//     ></checkbox>
const Checkbox = ({ isPending, readonly = false, form, name, label, placeholder }: TextFieldProps) => {
    return <FormField
        control={form.control}
        name="preferences"
        render={({ field }) => (
            <FormItem>
                <FormLabel>Preferences</FormLabel>
                <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name={`${field.name}.newsletter`}
                        render={({ field: newsletterField }) => (
                            <FormItem>
                                <FormControl>
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            {...newsletterField}
                                            checked={newsletterField.value}
                                            onChange={(e) => newsletterField.onChange(e.target.checked)}
                                        />
                                        <span>Subscribe to newsletter</span>
                                    </label>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={`${field.name}.notifications`}
                        render={({ field: notificationsField }) => (
                            <FormItem>
                                <FormControl>
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            {...notificationsField}
                                            checked={notificationsField.value}
                                            onChange={(e) => notificationsField.onChange(e.target.checked)}
                                        />
                                        <span>Enable notifications</span>
                                    </label>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </FormItem>
        )}
    />
};

export { Checkbox };