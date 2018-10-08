const validate = values => {
    const errors = {}
    if (!values.statement) {
      errors.statement = 'Required'
    }
    if (!values.feedback) {
      errors.feedback = 'Required'
    }
    if (!values.proposal || !values.proposal.length) {
      errors.proposal = { _error: 'Au moins une proposition doit être présente' }
    } else {
      const proposalArrayErrors = []
      values.proposal.forEach((member, memberIndex) => {
        const memberErrors = {}
        if (!member || !member.text) {
          memberErrors.text = 'Required'
          proposalArrayErrors[memberIndex] = memberErrors
        }
        if (!member || !member.value) {
          memberErrors.value = 'Required'
          proposalArrayErrors[memberIndex] = memberErrors
        }
        if (member && member.hobbies && member.hobbies.length) {
          const hobbyArrayErrors = []
          member.hobbies.forEach((hobby, hobbyIndex) => {
            if (!hobby || !hobby.length) {
              hobbyArrayErrors[hobbyIndex] = 'Required'
            }
          })
          if (hobbyArrayErrors.length) {
            memberErrors.hobbies = hobbyArrayErrors
            proposalArrayErrors[memberIndex] = memberErrors
          }
          if (member.hobbies.length > 5) {
            if (!memberErrors.hobbies) {
              memberErrors.hobbies = []
            }
            memberErrors.hobbies._error = 'No more than five hobbies allowed'
            proposalArrayErrors[memberIndex] = memberErrors
          }
        }
      })
      if (proposalArrayErrors.length) {
        errors.proposal = proposalArrayErrors
      }
    }
    return errors
  }
  
  export default validate