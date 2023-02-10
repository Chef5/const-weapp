Page({
  data: {
    loading: false,
    frequencyCode: 'p1',
    frequencyList: [
      { label: '一天1次', value: 'p0' },
      { label: '一天3次', value: 'p1' },
    ],
  },

  handleSelectChange(e) {
    const { index, selectValue } = e.detail;
    console.log(index, selectValue);
  },
});
