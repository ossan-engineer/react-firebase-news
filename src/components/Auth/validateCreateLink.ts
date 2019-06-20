export default function validateCreateLink(values: any) {
  let errors: any = {};

  // Description Errors
  if (!values.description) {
    errors.description = "Description required";
  } else if (values.description.length < 10) {
    errors.description = "Description must be at least 10 characters";
  }

  // Url Errors
  if (!values.url) {
    errors.url = "Url required";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
    errors.url = "Url must be valid";
  }

  return errors;
}
