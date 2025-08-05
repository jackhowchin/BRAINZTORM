using UnityEngine;
using UnityEngine.InputSystem;

public class QuickLook : MonoBehaviour
{
    [SerializeField] Camera cam;
    public float sensitivity = 0.12f; // lower = slower

    float pitch;

    void Awake()
    {
        if (!cam) cam = Camera.main;
        Cursor.lockState = CursorLockMode.Locked;
        Cursor.visible = false;
    }

    void Update()
    {
        Vector2 m = Mouse.current.delta.ReadValue() * sensitivity;
        transform.Rotate(0f, m.x, 0f);

        pitch = Mathf.Clamp(pitch - m.y, -80f, 80f);
        cam.transform.localEulerAngles = new Vector3(pitch, 0f, 0f);

        if (Keyboard.current.escapeKey.wasPressedThisFrame)
        {
            Cursor.lockState = CursorLockMode.None;
            Cursor.visible = true;
        }
    }
}
