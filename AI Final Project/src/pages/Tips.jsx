import React, { useState } from "react";

const tips = [
  "בדוק את כתובת השולח - האם היא אמינה ומוכרת?",
  "היזהר ממיילים שמבקשים ממך לעדכן סיסמה ללא סיבה ברורה.",
  "אל תלחץ על קישורים לא מוכרים במיילים חשודים.",
  "חפש שגיאות כתיב או תחביר לא רגיל במייל.",
  "אל תפתח קבצים מצורפים ממיילים שאינך מצפה להם.",
  "שמור את האנטי-וירוס שלך מעודכן לזיהוי איומים חדשים.",
];

const Tips = () => {
  const [currentTip, setCurrentTip] = useState(0);

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };

  return (
    <div className="tips-page">
      <h2>טיפים למניעת הונאות פישינג</h2>
      <div className="tip-box">
        <p>{tips[currentTip]}</p>
      </div>
      <button onClick={nextTip}>טיפ נוסף</button>
    </div>
  );
};

export default Tips;
